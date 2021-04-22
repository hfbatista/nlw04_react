import styles from '../styles/components/Cartao.module.css'

export function Cartao() {
    return (
        <div className={styles.cartaoContainer}>
            <div>
                <p> Henrique Freitas Batista </p>
                <p> 0921 0912 4234 1232</p>
                
                <div>
                    <p> 02/2021 </p>
                    <p> 03/2027 </p>
                    <p> 987 </p>
                </div>
            </div>
        </div>
    )
}