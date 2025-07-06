import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { Game } from './pages';

export function App() {
    return (
        <MantineProvider defaultColorScheme="dark">
            <Game />
        </MantineProvider>
    );
}
