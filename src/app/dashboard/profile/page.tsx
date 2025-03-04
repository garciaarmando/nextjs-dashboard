'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
export default function ProfilePage() {

    const {data: session } = useSession()
    const name = session?.user?.name ?? 'No Name'
    const email  = session?.user?.email ?? 'No Email'
    const image = session?.user?.image ?? 'No image'
    const userRoles = session?.user?.roles ?? ['client'];
    const userRolesJoin = userRoles.join(', ')

    return (
        <div>
            <h1>Profile Page</h1>

            <hr />

            <div className="flex flex-col">
                <span>{name}</span>
                <span>{email}</span>
                <span>{image}</span>
                <span>{userRolesJoin}</span>
            </div>
        </div>
    );
}