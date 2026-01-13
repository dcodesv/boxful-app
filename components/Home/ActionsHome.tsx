import { Add, AddCircle } from "iconsax-react-nativejs";
import { Alert, ScrollView, View } from "react-native";
import Actions from "../Home/Actions";
import Button from "../ui/Button";

export default function ActionsHome() {

    const actionPress = (action: string) => {
        Alert.alert("Action pressed: ", action);
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
                onPress={() => {}} 
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
            
        </View>
    );
}