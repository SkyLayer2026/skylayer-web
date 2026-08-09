export const printService = {
  printReceipt: async (data: any) => {
    try {
      // @ts-ignore
      const result = await window.api.printReceipt(data);
      return result;
    } catch (error) {
      console.error("Erro ao enviar dados para impressão:", error);
      return { success: false, error: "Erro ao enviar dados para impressão." };
    }
  },

  checkPrinter: async () => {
    try {
      // @ts-ignore
      const result = await window.api.checkPrinter();
      return result;
    } catch (error) {
      console.error("Erro ao verificar status da impressora:", error);
      return { success: false, error: "Erro ao verificar status da impressora." };
    }
  },
};
