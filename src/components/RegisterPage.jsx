import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import {
    Container,
    Form,
    Input,
    Button,
    ErrorMessage,
    Title,
    LinkText
} from '../styles/AuthStyles';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setError('');
            await signup({
                username: data.username,
                email: data.email,
                password: data.password
            });
            navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
        } catch (error) {
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Input
                    {...register("username", {
                        required: "사용자 이름을 입력해주세요",
                        minLength: {
                            value: 3,
                            message: "사용자 이름은 최소 3자 이상이어야 합니다"
                        }
                    })}
                    placeholder="사용자 이름"
                    disabled={isLoading}
                />
                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                <Input
                    {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "올바른 이메일 형식이 아닙니다"
                        }
                    })}
                    type="email"
                    placeholder="이메일"
                    disabled={isLoading}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <Input
                    {...register("password", {
                        required: "비밀번호를 입력해주세요",
                        minLength: {
                            value: 6,
                            message: "비밀번호는 최소 6자 이상이어야 합니다"
                        }
                    })}
                    type="password"
                    placeholder="비밀번호"
                    disabled={isLoading}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                <Input
                    {...register("passwordConfirm", {
                        required: "비밀번호를 다시 입력해주세요",
                        validate: (value) =>
                            value === watch('password') || "비밀번호가 일치하지 않습니다"
                    })}
                    type="password"
                    placeholder="비밀번호 확인"
                    disabled={isLoading}
                />
                {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '가입 중...' : '가입하기'}
                </Button>

                <LinkText>
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </LinkText>
            </Form>
        </Container>
    );
};

export default RegisterPage;