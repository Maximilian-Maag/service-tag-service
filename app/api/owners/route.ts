import { createOwner, getOwners } from "@/services/ownerService";

export async function GET() {
    const owners = await getOwners();
    return Response.json(owners);
}

export async function POST(request: Request) {
    const body = await request.json();
    const owner = await createOwner(body);
    return Response.json(owner, { status: 201 });
}
