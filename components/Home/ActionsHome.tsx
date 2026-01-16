import { Add, AddCircle } from "iconsax-react-nativejs";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import AlertModal from "../AlertModal";
import Actions from "../Home/Actions";
import Button from "../ui/Button";

export default function ActionsHome() {
    const [notEnabledModal, setNotEnabledModal] = useState(false);
    const [deliveryModal, setDeliveryModal] = useState(false);

    const actionPress = (action: string) => {
        setNotEnabledModal(true);
    }

    const deliveryPress = () => {
        setDeliveryModal(true);
    }

    const actions = [
        {
            title: "Cotiza",
            icon: Add,
            onPress: () => actionPress("Cotiza"),
            variant: "filled" as const,
            color: 'secondary' as const,
        },
        {
            title: "Lotes",
            icon: Add,
            onPress: () => actionPress("Lotes"),
            variant: "outline" as const,
            color: 'primary' as const,
        },
        {
            title: "Cupón",
            icon: Add,
            onPress: () => actionPress("Cupón"),
            variant: "outline" as const,
            color: 'primary' as const,
        },
        {
            title: "Ayuda",
            icon: Add,
            onPress: () => actionPress("Ayuda"),
            variant: "outline" as const,
            color: 'primary' as const,
        },
    ];

    return (
        <View className='flex-col justify-between items-center w-full py-4 gap-4'>
            <Button 
                title="Hacer envío" 
                size="large" 
                onPress={deliveryPress} 
                variant="primary" 
                Icon={AddCircle} 
                width="100%"
            />
            
            <ScrollView horizontal style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 14 }}>
                {actions.map((action, index) => (
                    <Actions 
                        key={index} 
                        title={action.title}
                        variant={action.variant}
                        color={action.color}
                        icon={<action.icon size={24}/>} 
                        onPress={action.onPress} 
                    />
                ))}
            </ScrollView>
            <AlertModal
                visible={notEnabledModal}
                type="warning"
                title="¡Ups!"
                message="Lo sentimos, pero esta opción no está disponible en este momento."
                onClose={() => setNotEnabledModal(false)}
                cancelText="Entendido"
            />
            <AlertModal
                visible={deliveryModal}
                type="success"
                title="Exito"
                message="El envío se ha realizado correctamente. ¡Gracias por utilizar Boxful!"
                onClose={() => setDeliveryModal(false)}
                cancelText="Entendido"
            />
        </View>
    );
}