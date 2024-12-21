import type { CollectionConfig } from 'payload'
import type { Access } from 'payload'


const adminUserOnly:Access = ( args ) => {
    if (!args.req.user){ return false }
    if (args.req.user.collection != "users") { return false }
    return true
}

const selfOrAdminUserOnly:Access = ( args ) => {
    
    if (!args.req.user){ return false }
    if (args.req.user.collection == "installation") { return true }
    if (args.req.user.collection == "users") { return true }
    return false
}
export const Logmessage: CollectionConfig = {
    "slug" : "logmessage",
    "hooks" : {
        "beforeOperation" : [
            async ({ args, operation, req,}) => {
                
                if (operation == "create") {
                    args.data.installation = req.user?.id
                }
                return args
            }
        ]
    },
    access : {
        "create" : selfOrAdminUserOnly,
        "read" : adminUserOnly,
        "delete" : adminUserOnly,
        "update" : adminUserOnly
    },
    fields : [
        {
            name : "installation",
            type : "relationship",
            relationTo : "installation",
            required : true
        },
        {
            name : "content" ,
            type : "textarea",
            required : true
        }
    ]
}