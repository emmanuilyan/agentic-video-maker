#!/usr/bin/env python3
"""Copy the tested self-contained video template into an unused project path."""
import argparse
import shutil
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('project', type=Path)
    args = parser.parse_args()
    destination = args.project.expanduser().resolve()
    source = Path(__file__).resolve().parents[1] / 'assets' / 'template'
    if destination.exists():
        parser.error(f'Destination already exists; select an unused project directory: {destination}')
    if not (source / 'package.json').is_file():
        parser.error(f'Template is missing: {source}')
    shutil.copytree(source, destination, ignore=shutil.ignore_patterns('node_modules', 'out', '.codegraph', '.git', '*.log', '__pycache__'))
    print(f'Created {destination}; run npm ci, npm run check, then npm run studio in that directory.')

if __name__ == '__main__':
    main()
