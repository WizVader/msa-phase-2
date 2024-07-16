import { useState, useEffect } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconClockFilled,
    IconTimeline,
    IconSquareCheckFilled,
    IconSettings,
    IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavigationBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import LogoutLink from './LogoutLink';

interface NavbarLinkProps {
    icon: typeof IconClockFilled;
    label: string;
    path: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, path, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <Link to={path}>
                <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                    <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                </UnstyledButton>
            </Link>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconClockFilled, label: 'Pomodoro', path: '/home/pomodoro' },
    { icon: IconSquareCheckFilled, label: 'Tasks', path: '/home/tasks' },
    { icon: IconTimeline, label: 'Habits', path: '/home/habittracking' },
];

function NavigationBar() {
    const location = useLocation();
    const [active, setActive] = useState(mockdata.findIndex(link => link.path === location.pathname));

    useEffect(() => {
        setActive(mockdata.findIndex(link => link.path === location.pathname));
    }, [location.pathname]);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <Center>
                <MantineLogo type="mark" size={30} />
            </Center>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconSettings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
                <LogoutLink>
                    <NavbarLink icon={IconLogout} label="Logout" path="/logout" active={location.pathname === '/logout'} />
                </LogoutLink>
            </Stack>
        </nav>
    );
}

export default NavigationBar;
