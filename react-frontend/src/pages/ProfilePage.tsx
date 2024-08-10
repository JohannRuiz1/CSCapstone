import './ProfilePage.css';
import {Link, useParams} from "react-router-dom";
import {NO_TOKEN, PROFESSOR_ROLE, STUDENT_ROLE} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {useStudentUserContext} from "../contexts/StudentUserContext.tsx";
import {useEffect, useState} from "react";
import {
    fetchProfessorByFullName,
    fetchStudentByFullName,
    updateProfessorProfile,
    updateStudentProfile,
    unsubscribe
} from "../services.ts";
import {MajorItem, ResearchLabItem} from "../types.ts";
import SituationCheckboxes from "../components/form/SituationCheckboxes.tsx";
import AcademicYearRadioButtons from "../components/form/AcademicYearRadioButtons.tsx";
import SubscriptionCheckboxes from "../components/form/SubscriptionCheckboxes.tsx";
import {Form, Formik} from "formik";
import TextInput from "../components/form/TextInput.tsx";

const wait = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));


interface ProfileUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    year?: string;  // STUDENT
    aboutMe?: string;   // STUDENT
    major?: MajorItem; // STUDENT
    subscriptions?: string[];
    college?: string; // PROFESSOR
    isPending?: boolean; // PROFESSOR
    lab?: ResearchLabItem; // PROFESSOR
}

const studentTypeMap: { [key: string]: string } = {
    'undergraduate': 'Undergraduate Student',
    'graduate-masters': "Graduate (Master's) Student",
    'graduate-phd': 'Graduate (PhD) Student'
};

const situationLabelMap: { [key: string]: string } = {
    'seeking-volunteer': 'Seeking Volunteer Opportunities',
    'seeking-credit': 'Seeking Credit Opportunities',
    'seeking-paid': 'Seeking Paid Opportunities',
    'current-volunteer': 'Currently a Volunteer',
    'current-credit': 'Currently Receiving Credit',
    'current-paid': 'Currently Paid',
    'other': 'Other'
};

interface EditStudentFormValues {
    studentType: 'undergraduate' | 'graduate-masters' | 'graduate-phd' | undefined;
    situation: string[] | undefined;
    unsubscribitions: string[] | undefined;
}

const mapStudentType = (year?: string): 'undergraduate' | 'graduate-masters' | 'graduate-phd' | undefined => {
    switch (year) {
        case 'undergraduate':
            return 'undergraduate';
        case 'graduate-masters':
            return 'graduate-masters';
        case 'graduate-phd':
            return 'graduate-phd';
        default:
            return undefined;
    }
};

let initialValuesStudent: EditStudentFormValues;

interface EditProfessorFormValues {
    labName: string;
    labUrl: string;
    labDescription: string;
}

let initialValuesProfessor: EditProfessorFormValues;


export default function ProfilePage() {
    const {role, fullName} = useParams();
    const {token, email} = useUserContext();
    const {fetchStudentDetails} = useStudentUserContext();
    const [profileUser, setProfileUser] = useState<ProfileUser>();
    const [isEditing, setIsEditing] = useState(false);

    const fetchProfileDetails = async () => {
        if (token !== NO_TOKEN && fullName) {
            try {
                if (role === PROFESSOR_ROLE) {
                    const result = await fetchProfessorByFullName(fullName, token);
                    setProfileUser(result);
                } else if (role === STUDENT_ROLE) {
                    const result = await fetchStudentByFullName(fullName, token);
                    setProfileUser(result);
                }
            } catch (error) {
                console.error("Failed to load user with name: " + fullName, error);
            }
        }
    };

    useEffect(() => {
        fetchProfileDetails();
    }, [fullName, role, token]);

    const isOwnProfile = profileUser?.email === email;

    if (role === STUDENT_ROLE) {
        initialValuesStudent = {
            studentType: mapStudentType(profileUser?.year),
            situation: profileUser?.aboutMe?.split(", "),
            unsubscribitions: undefined
        };
    } else if (role === PROFESSOR_ROLE) {
        initialValuesProfessor = {
            labName: profileUser?.lab?.name || '',
            labUrl: profileUser?.lab?.url || '',
            labDescription: profileUser?.lab?.description || ''
        }
    }

    const handleEditSaveStudent = async (
        values: EditStudentFormValues
    ) => {
        try {
            if (role === STUDENT_ROLE && profileUser?.id) {
                const situationsAsString = values.situation?.join(', '); // Adjust the separator as needed
                await updateStudentProfile(profileUser.id, {
                    year: values.studentType,
                    aboutMe: situationsAsString
                }, token);

                if (values.unsubscribitions != undefined) {
                    console.log("Unsubscribing");
                    const promises = values.unsubscribitions.map(subscription => {
                        unsubscribe(profileUser.id, subscription, token)
                            .then(response => {
                                console.log(`Success for subscription: ${subscription}`, response.data);
                            })
                            .catch(error => {
                                console.error(`Error for subscription: ${subscription}`, error);
                            });
                    });
                    await Promise.all(promises);
                }
                await wait(100); // Wait for 1 second
            }
            await fetchProfileDetails();
            // Fetch the updated profile details
            await fetchStudentDetails();

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleEditSaveProfessor = async (
        values: EditProfessorFormValues
    ) => {
        try {
            if (role === PROFESSOR_ROLE && profileUser?.id && profileUser.lab?.id) {
                await updateProfessorProfile(profileUser.id, {
                    lab: {
                        id: profileUser.lab.id,
                        name: values.labName,
                        url: values.labUrl,
                        description: values.labDescription,
                        principleInvestigator: profileUser.lab.principleInvestigator,
                        major: profileUser.lab.major
                    }
                }, token);
            }
            await fetchProfileDetails();
            setIsEditing(false);
        } catch (error) {
            console.error("failed to update profile");
        }
    };

    const displayStudentYear = profileUser?.year ? studentTypeMap[profileUser.year] : undefined;
    const aboutMeArray = profileUser?.aboutMe ? profileUser.aboutMe.split(', ') : [];
    const selectedLabels = aboutMeArray.map(value => situationLabelMap[value]);

    return (
        <div className='profile-page center-content'>
            {profileUser ? (
                <>
                    <div className='profile-header'>
                        <h1><span>{profileUser.firstName}</span> <span>{profileUser.lastName}</span></h1>
                        {isOwnProfile && (
                            <button className="tertiary-button" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        )}
                    </div>
                    {isEditing ? (
                        <div className='edit-section'>
                            {role === PROFESSOR_ROLE && initialValuesProfessor && (
                                <Formik initialValues={initialValuesProfessor} onSubmit={handleEditSaveProfessor}>
                                    <Form>
                                        <h2>Edit Lab Information</h2>
                                        <TextInput label="Research Lab Name" name="labName"/>
                                        <TextInput label="Research Lab Website URL" name="labUrl" type="url"/>
                                        <TextInput label="Research Lab Description" name="labDescription"
                                                   type="textarea"/>
                                        <button type="submit" className="primary-button">Save</button>
                                    </Form>
                                </Formik>
                            )}
                            {role === STUDENT_ROLE && (
                                <Formik initialValues={initialValuesStudent} onSubmit={handleEditSaveStudent}>
                                    <Form className="student-form">
                                        <h2>Edit Academic Information</h2>
                                        <AcademicYearRadioButtons/>
                                        <SituationCheckboxes/>
                                        {profileUser.subscriptions && profileUser.subscriptions.length > 0 && (
                                            <SubscriptionCheckboxes subscriptions={profileUser.subscriptions}/>
                                        )}
                                        <button type="submit" className="primary-button">Save</button>
                                    </Form>
                                </Formik>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className='profile-section'>
                                <h2>Contact Information</h2>
                                <p><span className="attribute">Email:</span> {profileUser.email}</p>
                            </div>
                            {role === STUDENT_ROLE && (
                                <>
                                    <div className='profile-section'>
                                        <h2>Academic Information</h2>
                                        <p>{displayStudentYear}</p>
                                        <p><span className="attribute">College of </span> {profileUser.major?.college}
                                        </p>
                                        <p><span className="attribute">Majoring in </span> {profileUser.major?.name}</p>
                                    </div>
                                    <div className='profile-section'>
                                        <h2>Current Situation</h2>
                                        <ul>
                                            {selectedLabels.map((label, index) => (
                                                <li key={index}>{label}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                            {role === STUDENT_ROLE && profileUser.subscriptions && (
                                <>
                                    <div className='profile-section'>
                                        <h2>Subscriptions</h2>
                                        {profileUser.subscriptions.length > 0 ? (
                                            <ul>
                                                {profileUser.subscriptions.map((sub, index) => (
                                                    <li key={index}>{sub}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No Subscriptions!</p>
                                        )}
                                    </div>
                                </>
                            )}
                            {role === PROFESSOR_ROLE && (
                                <div className='profile-section'>
                                    <h2>Academic Information</h2>
                                    <p><span className="attribute">Professor</span></p>
                                    <p><span className="attribute">College of</span> {profileUser.college}</p>
                                </div>
                            )}
                            {(role === PROFESSOR_ROLE && profileUser.lab) && (
                                <div className='profile-section'>
                                    <h2>Research Lab Information</h2>
                                    <p><span className="attribute">Lab Name:</span> {profileUser.lab?.name}</p>
                                    <p><span className="attribute">College:</span> {profileUser.lab?.major.college}</p>
                                    <p><span className="attribute">Major:</span> {profileUser.lab?.major.name}</p>
                                    <p><span
                                        className="attribute">Principal Investigator:</span> {profileUser.lab?.principleInvestigator}
                                    </p>
                                    <p><span className="attribute">URL:</span> <Link
                                        to={`${profileUser.lab.url}`}
                                        target="_blank">
                                        {profileUser.lab.url}</Link>
                                    </p>
                                    <p><span className="attribute">Description:</span> {profileUser.lab?.description}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
