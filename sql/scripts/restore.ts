import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'fs'

function restoreDatabase(container: string, user: string, dbName: string, dumpFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!existsSync(dumpFile)) {
            return reject(new Error(`Backup file not found: ${dumpFile}`));
        }

        const restore = spawn('docker', [
            'exec',
            '-i',
            container,
            'psql',
            '-U', user,
            '-d', dbName,
        ]);

        const inputStream = fs.createReadStream(dumpFile);
        inputStream.pipe(restore.stdin);

        let errorMessage = '';
        restore.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });

        restore.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                const error = new Error(`Database restoration failed with code ${code}. Stderr: ${errorMessage}`);
                reject(error);
            }
        });
    });
}

async function main() {
    try {
        await restoreDatabase(
            'bank-dotnet-postgres_db-1',
            'postgres',
            'bank_simulation_dev_dotnet',
            'backup_primary.sql'
        )

        await restoreDatabase(
            'bank-dotnet-postgres_db_audit-1',
            'postgres',
            'bank_simulation_audit_dev_dotnet',
            'backup_audit.sql'
        );

        console.log("All specified databases have been restored successfully!");
    } catch (error) {
        console.error("An error occurred during restoration:", error);
        throw error;
    }
}

main();