import { Summary } from "../Summary";
import { TrasactionTable } from "../TransactionTable";
import { Container } from "./styles";



export function Dashboard() {
    return (
        <Container>
            <Summary />
            <TrasactionTable />
        </Container>
    );
}