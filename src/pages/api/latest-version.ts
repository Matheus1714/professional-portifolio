export async function GET() {
    const response = await fetch('https://github.com/Matheus1714/professional-portifolio/releases/latest');

    const finalUrl = response.url;
    const paths = new URL(finalUrl).pathname.split('/');
    const latestVersion = paths[paths.length - 1];

    return new Response(JSON.stringify({ version: latestVersion }), { status: 200 });
}
