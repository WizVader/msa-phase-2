import React from 'react';
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
import classes from './Login.module.css';

interface SignUpProps {
    toggleForm: () => void;
}
const SignUp: React.FC<SignUpProps> = ({ toggleForm }) => {
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
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <PasswordInput label="Confirm Password" placeholder="Confirm your password" required mt="md" />
                <Button fullWidth mt="xl">
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}

export default SignUp;
