import axios, {AxiosResponse} from "axios";
import {
    CollegeItem,
    CommentItem,
    DiscussionItem,
    LoginForm,
    LoginResponse,
    MajorItem,
    OpeningsItem,
    ProfessorUser,
    ResearchLabItem,
    SignupForm,
    SignUpResponse,
    StudentUser
} from "./types";
import {
    collegesAPI,
    discussionsAPI,
    labsAPI,
    loginAPI,
    majorsAPI,
    NO_TOKEN,
    openingsAPI,
    professorsAPI,
    signUpAPI,
    studentsAPI,
    subscriptionsAPI,
    adminAPI
} from "./utils.ts";

export const fetchResearchLabs = async (token: string): Promise<ResearchLabItem[]> => {
    const response = await axios.get(`${labsAPI}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data as ResearchLabItem[];
}

export const fetchResearchLabsByCollegeName = async (collegeName: string | undefined, token: string): Promise<ResearchLabItem[]> => {
    const response = await axios.get(`${labsAPI}/college/${collegeName}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data as ResearchLabItem[];
}

export const fetchResearchLabsByMajorName = async (majorName: string | undefined, token: string): Promise<ResearchLabItem[]> => {
    const response = await axios.get(`${labsAPI}/major/${majorName}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data as ResearchLabItem[];
}

export const fetchResearchLabById = async (id: number | undefined, token: string): Promise<ResearchLabItem> => {
    const response = await axios.get(`${labsAPI}/id/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data as ResearchLabItem;
}

export const fetchOpenings = async (token: string): Promise<OpeningsItem[]> => {
    const response = await axios.get(`${openingsAPI}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data as OpeningsItem[];
}

export const deleteOpening = async (id: number, token: string) => {
    const response = await axios.delete(`${openingsAPI}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};

export const fetchDiscussions = async (token: string): Promise<DiscussionItem[]> => {
    const response = await axios.get(`${discussionsAPI}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        params: {
            comments: true
        }
    });
    return response.data as DiscussionItem[];
}

export const fetchDiscussionById = async (id: string | undefined, token: string): Promise<DiscussionItem> => {
    const response = await axios.get(`${discussionsAPI}/id/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data as DiscussionItem;
}

export const deleteDiscussion = async (id: number, token: string) => {
    const response = await axios.delete(`${discussionsAPI}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};

export const deleteComment = async (commentId: number, token: string) => {
    const response = await axios.delete(`${discussionsAPI}/comments/${commentId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};

export const addCommentByDiscussionId = async (discussionId: number, comment: CommentItem, token: string): Promise<void> => {
    const response = await axios.post(`${discussionsAPI}/addComment/${discussionId}`, comment, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export const fetchColleges = async (): Promise<CollegeItem[]> => {
    const response = await axios.get(`${collegesAPI}`, {
        params: {
            majors: true
        }
    });
    return response.data as CollegeItem[];
}

export const fetchMajors = async (): Promise<MajorItem[]> => {
    const response = await axios.get(`${majorsAPI}`, {
        params: {
            colleges: true
        }
    });
    return response.data as MajorItem[];
}

export const fetchStudentUserByEmail = async (email: string, token: string): Promise<StudentUser> => {
    const response = await axios.get(`${studentsAPI}/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as StudentUser;
}

export const fetchProfessorUserByEmail = async (email: string, token: string): Promise<ProfessorUser> => {
    const response = await axios.get(`${professorsAPI}/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as ProfessorUser;
}

export const fetchStudentByFullName = async (fullName: string, token: string): Promise<StudentUser> => {
    const response = await axios.get(`${studentsAPI}/fullname/${fullName}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as StudentUser;
}

export const fetchProfessorByFullName = async (fullName: string, token: string): Promise<ProfessorUser> => {
    const response = await axios.get(`${professorsAPI}/fullName/${fullName}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as ProfessorUser;
}

export async function login(loginForm: LoginForm): Promise<LoginResponse> {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            `${loginAPI}`,
            loginForm,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
            }
        );
        const authHeader = response.headers['authorization'];
        let token = NO_TOKEN;
        if (authHeader) {
            token = authHeader.replace('Bearer ', '');
        }
        return {
            success: response.data.success,
            message: response.data.message,
            role: response.data.role,
            token: token
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const response = error.response;
            return {
                success: response.data.success,
                message: response.data.message,
                role: response.data.role,
                token: NO_TOKEN
            };
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}


export async function signUp(signUpForm: SignupForm): Promise<SignUpResponse> {
    try {
        const response: AxiosResponse<SignUpResponse> = await axios.post(
            `${signUpAPI}`,
            signUpForm,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const response = error.response;
            return {
                success: response.data.success,
                message: response.data.message,
            };
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const updateProfessorProfile = async (id: number, data: Partial<ProfessorUser>, token: string) => {
    const response = await axios.put(`${professorsAPI}/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data as ProfessorUser;
};

export const updateStudentProfile = async (id: number, data: Partial<StudentUser>, token: string) => {
    const response = await axios.put(`${studentsAPI}/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data as StudentUser;
};

export const fetchProfessors = async (token: string): Promise<ProfessorUser[]> => {
    const response = await axios.get(`${professorsAPI}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as ProfessorUser[];
}

export const fetchStudents = async (token: string): Promise<StudentUser[]> => {
    const response = await axios.get(`${studentsAPI}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data as StudentUser[];
}


export const subscribe = async (id: number, labName: string, token: string) => {
    const response = await axios.post(`${subscriptionsAPI}/subscribe?studentId=${id}&labName=${labName}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};

export const unsubscribe = async (id: number, labName: string, token: string) => {
    const response = await axios.post(`${subscriptionsAPI}/unsubscribe?studentId=${id}&labName=${labName}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};


export const deleteUser = async (id: number, token: string) => {
    const response = await axios.delete(`${adminAPI}/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};