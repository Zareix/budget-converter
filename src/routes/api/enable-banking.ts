import { createFileRoute } from '@tanstack/react-router'
import { completeAuthorization } from '@/lib/fetcher/enable-banking'

export const Route = createFileRoute('/api/enable-banking')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const code = new URL(request.url).searchParams.get('code')

        if (!code) {
          return new Response(
            JSON.stringify({
              error: 'Code/state not found in query parameters',
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
        }

        await completeAuthorization(code)

        return new Response(null, {
          status: 302,
          headers: {
            Location: '/settings',
          },
        })
      },
    },
  },
})
