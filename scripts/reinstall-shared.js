const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Desinstalar o pacote
  console.log('Desinstalando @mfe/cc-front-shared...');
  execSync('npm remove @mfe/cc-front-shared', { stdio: 'inherit' });

  // Limpar o cache
  console.log('Limpando cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });

  // Remover a pasta .next se existir
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('Removendo pasta .next...');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  // Reinstalar o pacote
  console.log('Reinstalando @mfe/cc-front-shared...');
  execSync('npm install @mfe/cc-front-shared', { stdio: 'inherit' });

  console.log('Pacote @mfe/cc-front-shared foi desinstalado e reinstalado com sucesso!');
} catch (error) {
  console.error('Erro durante a reinstalação:', error);
  process.exit(1);
}