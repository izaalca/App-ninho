export const dynamic = 'force-static'

export function GET() {
  const manifest = {
    name: 'Ninho Doula',
    short_name: 'Ninho',
    description:
      'Ninho Doula — o aplicativo que acolhe doulas e gestantes em uma só jornada de cuidado.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f4ecdf',
    theme_color: '#c8714a',
    icons: [
      {
        src: '/icon-ninho.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  })
}
