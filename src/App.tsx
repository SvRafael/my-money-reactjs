import { ThemeProvider } from "styled-components";
import { Transactions } from "./pages/Transactions";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { TransactionProvider } from "./contexts/TransactionContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionProvider>
        <Transactions /> 
      </TransactionProvider>
    </ThemeProvider>
  )
}