import ThermalPrinter, { PrinterTypes } from "node-thermal-printer";
import path from "path";
import fs from "fs";

const CONFIG_PATH = path.join(__dirname, "../config/printer.json");

export interface ReceiptData {
  branchName: string; address: string; phone: string; saleId: string;
  operator: string; date: string;
  items: Array<{ name: string; qty: number; price: number; total: number }>;
  subtotal: number; tax: number; total: number; amountPaid: number; change: number;
}

export const printReceiptNative = async (data: ReceiptData) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    const printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: config.printerInterface,
      options: { timeout: 1000 },
      driver: require("node-thermal-printer-web"), // Usar driver web para compatibilidade
    });

    printer.alignCenter();
    printer.println(data.branchName);
    printer.println(data.address);
    printer.println(data.phone);
    printer.println("----------------------------------------");
    printer.alignLeft();
    printer.println(`Venda ID: ${data.saleId}`);
    printer.println(`Operador: ${data.operator}`);
    printer.println(`Data: ${data.date}`);
    printer.println("----------------------------------------");
    printer.tableCustom([
      { text: "Item", align: "LEFT", width: 0.5 },
      { text: "Qtd", align: "CENTER", width: 0.15 },
      { text: "Unit.", align: "RIGHT", width: 0.15 },
      { text: "Total", align: "RIGHT", width: 0.2 },
    ]);
    data.items.forEach(item => {
      printer.tableCustom([
        { text: item.name, align: "LEFT", width: 0.5 },
        { text: item.qty.toString(), align: "CENTER", width: 0.15 },
        { text: item.price.toFixed(2), align: "RIGHT", width: 0.15 },
        { text: item.total.toFixed(2), align: "RIGHT", width: 0.2 },
      ]);
    });
    printer.println("----------------------------------------");
    printer.alignRight();
    printer.println(`Subtotal: R$ ${data.subtotal.toFixed(2)}`);
    printer.println(`Taxa: R$ ${data.tax.toFixed(2)}`);
    printer.println(`Total: R$ ${data.total.toFixed(2)}`);
    printer.println(`Pago: R$ ${data.amountPaid.toFixed(2)}`);
    printer.println(`Troco: R$ ${data.change.toFixed(2)}`);
    printer.println("----------------------------------------");
    printer.alignCenter();
    printer.println("Obrigado pela preferência!");
    printer.feed(3);
    printer.cut();

    await printer.execute();
    console.log("Recibo impresso com sucesso.");
    return { success: true };
  } catch (error) {
    console.error("Erro ao imprimir recibo:", error);
    return { success: false, error: (error as Error).message };
  }
};
