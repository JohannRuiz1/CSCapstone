export interface StudentUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    year: string;    // Undergraduate or Graduate
    aboutMe: string; // "Actively Seeking Research Opportunities" or "Current Researcher Receiving Credit"
    major: MajorItem;   // Major
    subscriptions: string[];
    userId: number;
}

export interface ProfessorUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    college: string;
    isPending: boolean;
    lab: ResearchLabItem;
    userId: number;
}

export interface ResearchLabItem {
    id: number;
    name: string;
    url: string;
    principleInvestigator: string;
    description: string;
    major: MajorItem;  // major has college string associated with it
}

export interface OpeningsItem {
    id: number;
    name: string;
    description: string;
    type: string;
    url: string;
    labName: string;
    professor: ProfessorUser;
    createdAt: Date;
}

export interface CollegeItem {
    id: number;
    name: string;
    majors: MajorItem[];
}

export interface MajorItem {
    id: number;
    name: string;
    college: string;
}

export interface DiscussionItem {
    id: number;
    title: string;
    content: string;
    numberOfComments: number;
    createdAt: Date;
    labName: string;
    student: StudentUser;
    comments: CommentItem[];
}

export interface CommentItem {
    id: number;
    content: string;
    createdAt: Date;
    studentName: string;
}

export interface LoginForm {
    username: string;
    password: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    role: string;
    token: string;
}

export interface SignupForm {
    username: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    year?: string,   // Student
    majorId?: number, // Student
    aboutMe?: string,    // Student
    collegeId?: number, // Professor
    labName?: string,    // Professor
    labUrl?: string,    // Professor
    labDescription?: string, //Professor

}

export interface SignUpResponse {
    success: boolean;
    message: string;
}