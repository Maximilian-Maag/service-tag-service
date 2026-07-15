import { deleteOwner, getOwnerById, updateOwner } from "@/services/ownerService";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const owner = await getOwnerById(Number(id));

    if (!owner) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(owner);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const owner = await updateOwner(Number(id), body);

    if (!owner) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(owner);
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const owner = await deleteOwner(Number(id));

    if (!owner) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
}
