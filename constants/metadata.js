import { brand } from '@/constants/brand';

export const metadata = {
    title: {
        default: brand.title,
        template: `${brand.name} | %s`
    },
    description: brand.description,
    applicationName: brand.name,
    authors: {
        name: brand.author.name,
        url: brand.author.website
    },
    locale: brand.locale,
    generator: 'Next.js',
    keywords:
        'NextWave, Next-Generation Learning Solutions, Innovative Education, Modern Learning, Educational Technology, School Management, Academic Tracking, Student Engagement, Educator Empowerment, Immersive Learning, Digital Education, Online Learning Platform, Future of Education, Educational Transformation, Education Management, Next.js Learning Platform, Next.js Education Solutions, React Education Tools, Advanced Learning Management, Seamless Educational Experience',
    referrer: 'origin',
    creator: brand.author.name,
    publisher: brand.author.name,
    robots: 'index, follow',
    icons: {
        icon: [
            {
                url: '/assets/icons/icon-16x16.ico',
                sizes: '16x16',
                type: 'image/x-icon'
            },
            {
                url: '/assets/icons/icon-32x32.ico',
                sizes: '32x32',
                type: 'image/x-icon'
            },
            {
                url: '/assets/icons/icon-48x48.ico',
                sizes: '48x48',
                type: 'image/x-icon'
            },
            {
                url: '/assets/icons/android-icon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                url: '/assets/icons/android-icon-256x256.png',
                sizes: '256x256',
                type: 'image/png'
            }
        ],
        apple: {
            url: '/assets/icons/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
        }
    },
    openGraph: {
        type: 'website',
        title: brand.title,
        description: brand.description,
        emails: brand.email,
        phoneNumbers: brand.phone,
        faxNumbers: brand.fax,
        siteName: brand.name,
        locale: brand.locale,
        images: [
            {
                url: `/assets/images/${brand.name.toLowerCase()}.jpeg`,
                alt: brand.name,
                type: 'image/jpeg',
                width: 400,
                height: 300
            }
        ],
        url: brand.website,
        countryName: brand.country
    },
    twitter: {
        card: 'summary_large_image',
        site: brand.twitter,
        creator: brand.twitter,
        description: brand.description,
        title: brand.name,
        images: [
            {
                url: `/assets/images/${brand.name.toLowerCase()}.jpeg`,
                alt: brand.name,
                type: 'image/jpeg',
                width: 400,
                height: 300
            }
        ]
    },
    metadataBase: new URL(brand.website)
};