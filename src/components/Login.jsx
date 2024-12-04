import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    Input,
    Button,
    ErrorMessage,
    Title,
    LinkText
} from '../styles/AuthStyles';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            // API 호출 로직 구현
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>로그인</Title>

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
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <Input
                    {...register("password", {
                        required: "비밀번호를 입력해주세요"
                    })}
                    type="password"
                    placeholder="비밀번호"
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                <Button type="submit">로그인</Button>

                <LinkText>
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </LinkText>
            </Form>
        </Container>
    );
};

export default Login;