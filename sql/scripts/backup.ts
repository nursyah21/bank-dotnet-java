import { spawn } from 'node:child_process';
import { existsSync, writeFileSync, createWriteStream } from 'node:fs';

function backupDatabase(container: string, user: string, dbName: string, dumpFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!existsSync(dumpFile)) {
            writeFileSync(dumpFile, "");
        }

        const dump = spawn('docker', [
            'exec',
            '-i',
            container,
            'pg_dump',
            '-U', user,
            '-d', dbName,
        ]);

        const outputStream = createWriteStream(dumpFile);
        dump.stdout.pipe(outputStream);

        let errorMessage = '';
        dump.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });

        dump.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                const error = new Error(`Database backup failed with code ${code}. Stderr: ${errorMessage}`);
                reject(error);
            }
        });

    })
}

async function main() {
    try {
        await backupDatabase(
            'bank-dotnet-postgres_db-1', 
            'postgres', 
            'bank_simulation_dev_dotnet', 
            'backup_primary.sql'
        )

        await backupDatabase(
            'bank-dotnet-postgres_db_audit-1', 
            'postgres', 
            'bank_simulation_audit_dev_dotnet', 
            'backup_audit.sql'
        )

        console.log("All backups completed successfully!");
    } catch (error) {
        console.log("An error occurred during backup:", error)
        throw error
    }
}

main()