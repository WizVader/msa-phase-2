import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';

import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import classes from './Login.module.css';

interface LoginProps {
    toggleForm: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleForm }) => {
    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(1, { message: 'Password is required' }),
        rememberMe: z.boolean(),
    });

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: zodResolver(schema),
    });

    const [error, setError] = useState<string>("");

    const handleSubmit = (values: typeof form.values) => {
        const { email, password, rememberMe } = values;
        const loginurl = rememberMe ? "/login?useCookies=true" : "/login?useSessionCookies=true";

        fetch(loginurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setError("Successful Login.");
                    window.location.href = '/home'; // Call the parent component's success handler
                } else {
                    setError("Error Logging In.");
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
                Welcome!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={toggleForm}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" {...form.getInputProps('rememberMe', { type: 'checkbox' })} />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
                {error && <Text color="red" mt="md">{error}</Text>}
            </Paper>
        </Container>
    );
}

export default Login;
