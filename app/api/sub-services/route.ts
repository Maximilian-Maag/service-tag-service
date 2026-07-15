import { createSubService, getSubServices } from "@/services/subServiceService";

export async function GET() {
    const subServices = await getSubServices();
    return Response.json(subServices);
}

export async function POST(request: Request) {
    const body = await request.json();
    const subService = await createSubService(body);
    return Response.json(subService, { status: 201 });
}
