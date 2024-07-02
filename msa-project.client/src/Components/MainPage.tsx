import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './MainPage.module.css';

function MainPage() {
    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    <Text component="span" variant="gradient" gradient={{ from: '#009688', to: '#004d40' }} inherit>
                        OrganisEasy
                    </Text>
                </h1>
                <h2 className={classes.body}>
                    <Text component="span" variant="gradient" gradient={{ from: '#03a9f4', to: '#0288d1' }} inherit>
                        Organise, Track, and Achieve
                    </Text>
                </h2>

                <h2>
                    Your All-in-One Productivity Partner
                </h2>

                <Text className={classes.description} color="dimmed">
                    Build fully functional accessible web applications with ease - Mantine includes more than
                    100 customizable components and hooks to cover you in any situation
                </Text>
                {/*<Group className={classes.controls}>*/}
                {/*    <Button*/}
                {/*        size="xl"*/}
                {/*        className={classes.control}*/}
                {/*        variant="gradient"*/}
                {/*        gradient={{ from: 'blue', to: 'cyan' }}*/}
                {/*    >*/}
                {/*        Get started*/}
                {/*    </Button>*/}

                {/*    <Button*/}
                {/*        component="a"*/}
                {/*        href="https://github.com/mantinedev/mantine"*/}
                {/*        size="xl"*/}
                {/*        variant="default"*/}
                {/*        className={classes.control}*/}
                {/*        leftSection={<GithubIcon size={20} />}*/}
                {/*    >*/}
                {/*        GitHub*/}
                {/*    </Button>*/}
                {/*</Group> */}
            </Container>
        </div>
    );
}

export default MainPage;
