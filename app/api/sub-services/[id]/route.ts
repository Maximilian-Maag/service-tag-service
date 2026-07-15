import { deleteSubService, getSubServiceById, updateSubService } from "@/services/subServiceService";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const subService = await getSubServiceById(Number(id));

    if (!subService) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(subService);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const subService = await updateSubService(Number(id), body);

    if (!subService) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(subService);
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const subService = await deleteSubService(Number(id));

    if (!subService) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
}
