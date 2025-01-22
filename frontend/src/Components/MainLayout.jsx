import Navigator from "./Navigator"

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navigator />
            {children}
        </div>
    )
}

export default MainLayout;