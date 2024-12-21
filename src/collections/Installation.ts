import type { CollectionConfig } from 'payload'
import type { Access } from 'payload'

const adminUserOnly:Access = ( args ) => {
    if (!args.req.user){ return false }
    if (args.req.user.collection != "users") { return false }
    return true
}

const selfOrAdminUserOnly:Access = ( args ) => {
    if (!args.req.user){ return false }
    if (args.req.user.collection == "installation" &&
        args.req.user.id == args.id
    ) { return true }
    if (args.req.user.collection == "users") { return true }
    return false
}

export const Installation: CollectionConfig = {
    slug : "installation",
    
    auth: {
        disableLocalStrategy: true,
        useAPIKey: true
    },
    access : {
        "create" : adminUserOnly,
        "delete" : adminUserOnly,
        "read" : selfOrAdminUserOnly,
        "update" : adminUserOnly
    },
    fields : [
        {name : "label", type : "text"},
        { name : "active", type: "checkbox"},
        { name : "logs" , type : "join", collection : "logmessage", on : "installation"}
    ]
}