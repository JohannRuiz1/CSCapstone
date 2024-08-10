export const baseUrl = 'https://vtrc-backend.discovery.cs.vt.edu/api'
//export const baseUrl = 'http://localhost:8080/api'

export const loginAPI = `${baseUrl}/login`;
export const signUpAPI = `${baseUrl}/signup`;
export const labsAPI = `${baseUrl}/labs`;
export const openingsAPI = `${baseUrl}/postings`;
export const discussionsAPI = `${baseUrl}/discussions`;
export const collegesAPI = `${baseUrl}/colleges`;
export const majorsAPI = `${baseUrl}/majors`;
export const studentsAPI = `${baseUrl}/students`;
export const professorsAPI = `${baseUrl}/professors`;
export const subscriptionsAPI = `${baseUrl}/subscriptions`;
export const adminAPI = `${baseUrl}/admin`;



// ROUTES
export const welcomePagePath = '/';
export const adminPagePath = '/admin';
export const signUpStudentPagePath = '/signup/student';
export const signUpProfessorPagePath = '/signup/professor';
export const loginPagePath = '/login';
export const signupConfirmationPagePath = '/signup/confirmation';
export const labsPagePath = '/labs';
export const openingsPagePath = '/openings';
export const discussionPagePath = '/discussion';
export const profilePagePath = '/profile';

export const NO_TOKEN = '';

export const LOGGED_OUT_ROLE = "LOGGED_OUT";
export const STUDENT_ROLE = "STUDENT";
export const PROFESSOR_ROLE = "PROFESSOR";
export const ADMIN_ROLE = "ADMIN";

export const NO_EMAIL = '';

export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}