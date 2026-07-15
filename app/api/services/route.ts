import { createService, getServices } from "@/services/serviceService";

export async function GET() {
    const services = await getServices();
    return Response.json(services);
}

export async function POST(request: Request) {
    const body = await request.json();
    const service = await createService(body);
    return Response.json(service, { status: 201 });
}
