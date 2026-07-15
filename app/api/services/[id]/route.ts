import { deleteService, getServiceById, updateService } from "@/services/serviceService";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const service = await getServiceById(Number(id));

    if (!service) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(service);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const service = await updateService(Number(id), body);

    if (!service) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(service);
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const service = await deleteService(Number(id));

    if (!service) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
}
