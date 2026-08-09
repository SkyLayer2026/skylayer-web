import ThermalPrinter, { PrinterTypes } from 'node-thermal-printer';
import path from 'path';
import fs from 'fs';

const CONFIG_PATH = path.join(__dirname, 'config', 'printer.json');

interface ReceiptData {
  branchName: string;
  address: string;
  phone: string;
  saleId: string;
  operator: string;
  date: string;
  items: Array<{ name: string; qty: number; price: number; total: number }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
}

export const printReceiptNative = async (receipt: ReceiptData) => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  
  const printer = new ThermalPrinter({
    type: PrinterTypes[config.type as keyof typeof PrinterTypes] || PrinterTypes.EPSON,
    interface: config.interface,
    options: {
      timeout: config.timeout,
      characterSet: config.characterSet || 'CP858',
      width: config.paperWidth === 80 ? 42 : 48
    }
  });

  try {
    printer.alignCenter();
    printer.println(receipt.branchName.toUpperCase());
    printer.println(receipt.address);
    printer.println(`Tel: ${receipt.phone}`);
    printer.drawLine();
    
    printer.alignLeft();
    printer.println(`Venda: ${receipt.saleId.slice(-8).toUpperCase()}`);
    printer.println(`Data: ${new Date(receipt.date).toLocaleString('pt-PT')}`);
    printer.println(`Operador: ${receipt.operator || 'Caixa 1'}`);
    printer.drawLine();
    
    printer.println('ITEM                QTD   PREÇO    TOTAL');
    printer.drawLine();
    
    for (const item of receipt.items) {
      const name = item.name.length > 18 ? item.name.substring(0, 16) + '..' : item.name.padEnd(18);
      printer.println(`${name} ${item.qty.toString().padStart(3)}  ${item.price.toFixed(2).padStart(7)}  ${item.total.toFixed(2).padStart(7)}`);
    }
    
    printer.drawLine();
    printer.alignRight();
    printer.println(`Subtotal: ${receipt.subtotal.toFixed(2)} MT`);
    if (receipt.tax > 0) printer.println(`IVA: ${receipt.tax.toFixed(2)} MT`);
    printer.bold(true);
    printer.println(`TOTAL: ${receipt.total.toFixed(2)} MT`);
    printer.bold(false);
    printer.println(`Pago: ${receipt.amountPaid.toFixed(2)} MT`);
    printer.println(`Troco: ${receipt.change.toFixed(2)} MT`);
    printer.println(`Forma: ${receipt.paymentMethod}`);
    printer.drawLine();
    printer.alignCenter();
    printer.println('Obrigado pela preferência!');
    printer.println('Não é documento fiscal.');
    printer.println('Farmácia Luri © 2024');
    
    if (config.cashDrawer) printer.openCashDrawer();
    printer.cut();
    
    await printer.execute();
    return { success: true };
  } catch (error: any) {
    console.error('[PRINTER] Erro:', error);
    return { success: false, error: error.message || 'Falha na comunicação com a impressora' };
  }
};