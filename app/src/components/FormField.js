import { Controller } from "react-hook-form";
import { View, TextInput, Text, Button } from "react-native";
import { Styles } from "../../Styles";

const FormField = ({
  name,
  control,
  errors,
  placeholder,
  keyboardType,
  secureTextEntry,
}) => (
  <View>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          placeholder={placeholder}
          onChangeText={field.onChange}
          value={field.value}
          style={Styles.input}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      )}
    />
    {errors && errors[name] && (
      <Text style={{ color: "red", padding: 2 }}>{errors[name].message}</Text>
    )}
  </View>
);

export default FormField;
