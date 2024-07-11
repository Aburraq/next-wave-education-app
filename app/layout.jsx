import { Roboto } from 'next/font/google';
import '@/styles/styles.scss';
import localFont from 'next/font/local';

export { metadata } from '@/constants/metadata';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-roboto'
});

const modulus = localFont({
    src: [
        {
            path: '../public/assets/fonts/Modulus.ttf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/assets/fonts/Modulus_Medium.ttf',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/assets/fonts/Modulus-Bold.otf',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-modulus'
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${roboto.variable} ${modulus.variable}`}>
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
