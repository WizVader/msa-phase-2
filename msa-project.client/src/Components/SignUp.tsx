import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import classes from './Login.module.css';

interface SignUpProps {
    toggleForm: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ toggleForm }) => {
    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(1, { message: 'Password is required' }),
        confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: zodResolver(schema),
    });

    const [error, setError] = useState<string>("");

    const handleSubmit = (values: typeof form.values) => {
        const { email, password } = values;

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setError("Successful Sign Up.");
                } else {
                    setError("Error Signing Up.");
                }
            })
            .catch((error) => {
                console.error(error);
                setError("Network Error");
            });
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Create an account
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component="button" onClick={toggleForm}>
                    Sign in
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
                    <PasswordInput label="Confirm Password" placeholder="Confirm your password" required mt="md" {...form.getInputProps('confirmPassword')} />
                    <Button type="submit" fullWidth mt="xl">
                        Sign up
                    </Button>
                </form>
                {error && <Text color="red" mt="md">{error}</Text>}
            </Paper>
        </Container>
    );
}

export default SignUp;
