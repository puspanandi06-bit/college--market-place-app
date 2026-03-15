export async function GET() {
  return Response.json({
    status: "API working",
    listings: []
  });
}