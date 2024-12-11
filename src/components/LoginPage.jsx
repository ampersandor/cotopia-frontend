import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import {
    Container,
    Form,
    Input,
    Button,
    ErrorMessage,
    Title,
    LinkText
} from '../styles/AuthStyles';

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setError('');
            await login(data.username, data.password);
            navigate('/'); // 로그인 성공 시 홈으로 이동
        } catch (error) {
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>로그인</Title>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Input
                    {...register("username", {
                        required: "사용자 이름을 입력해주세요",
                        minLength: {
                            value: 3,
                            message: "사용자 이름은 최소 3자 이상이어야 합니다"
                        }
                    })}
                    type="text"
                    placeholder="사용자 이름"
                    disabled={isLoading}
                />
                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                <Input
                    {...register("password", {
                        required: "비밀번호를 입력해주세요"
                    })}
                    type="password"
                    placeholder="비밀번호"
                    disabled={isLoading}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>

                <LinkText>
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </LinkText>
            </Form>
        </Container>
    );
};

export default LoginPage;