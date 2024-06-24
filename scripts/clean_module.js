import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as rimraf from 'rimraf'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packagesPath = [
    path.join(__dirname, '../packages/frameworks/block_std'),
    path.join(__dirname, '../packages/frameworks/global'),
    path.join(__dirname, '../packages/frameworks/inline'),
    path.join(__dirname, '../packages/frameworks/store'),
    path.join(__dirname, '../packages/frameworks/sync'),
    path.join(__dirname, '../packages/blocks'),
    path.join(__dirname, '../packages/presets'),
    path.join(__dirname, '../packages/theme'),
    path.join(__dirname, '../packages/playground'),
]

const dirsToDelete = [
    '../dist',
    '../node_modules',
    '../tsconfig.tsbuildinfo',
    '../tsconfig.node.tsbuildinfo',
    '../CHANGELOG.md',
]

packagesPath.forEach((packagePath) => {
    fs.readdir(packagePath, (err, files) => {
        if (err) {
            console.error(err)
            return
        }
        files.forEach((file) => {
            const dirPath = path.join(packagePath, file)
            fs.lstat(dirPath, (err, stats) => {
                if (err) {
                    console.error(err)
                    return
                }
                dirsToDelete.forEach((dirToDelete) => {
                    const dirPathToDelete = path.join(dirPath, dirToDelete)
                    console.log(dirPathToDelete)
                    if (fs.existsSync(dirPathToDelete)) {
                        rimraf.sync(dirPathToDelete)
                        console.log(`delete ${dirPathToDelete}`)
                    }
                })
            })
        })
    })
})
