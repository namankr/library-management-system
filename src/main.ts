import * as fs from 'fs';
import { Simulator } from './Simulator';

const fileName = process.argv[2];

if (!fileName) {
    console.error('Usage: ts-node src/main.ts <input_file>');
    process.exit(1);
}

const lines = fs.readFileSync(fileName,'utf-8').trim().split('\n');
const simulator = new Simulator();
lines.forEach((line: string) => {
    simulator.execute(line);
});