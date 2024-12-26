// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Logmessage } from './collections/Logmessage'
import { Installation } from './collections/Installation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
import { migrations } from './migrations'
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Installation, Logmessage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    prodMigrations: migrations,
    client: {
      url: process.env.DATABASE_URI || '',
     
    },
  }),
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
