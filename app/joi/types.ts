export type SignUpRequest = {
    username: string;
    password: string;
    email: string;
    confirmPassword?: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};
