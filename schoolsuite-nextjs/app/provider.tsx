"use client";

import { useRouter } from 'next/navigation';
import { Provider } from '@react-spectrum/s2';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

function SpectrumProvider({ children, lang, router }: { children: React.ReactNode, lang: string, router: any }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Provider locale={lang} router={router}>
                {children}
            </Provider>
        );
    }

    return (
        <Provider locale={lang} router={router} colorScheme={resolvedTheme as 'light' | 'dark'}>
            {children}
        </Provider>
    );
}

export function ClientProvider({ lang, children }: { lang: string, children: React.ReactNode }) {
    let router = useRouter();

    return (
        <AuthProvider>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                <SpectrumProvider lang={lang} router={{ navigate: router.push }}>
                    {children}
                </SpectrumProvider>
            </NextThemesProvider>
        </AuthProvider>
    );
}