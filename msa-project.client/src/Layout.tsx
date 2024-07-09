import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger } from '@mantine/core';
import NavigationBar from './Components/NavigationBar.tsx';
import { Outlet } from "react-router-dom";

function Layout() {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: { base: 40, md: 50, lg: 60 } }}
            navbar={{ width: 80, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <NavigationBar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default Layout;