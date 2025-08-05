import { useToast } from "@/hooks/use-toast";
import { FaCartPlus } from "react-icons/fa";
import { useShoppingCart } from "use-shopping-cart";



const AddToCartButton = ({
  name,
  currency,
  id,
  description,
  quantity,
  image,
  seat,
}) => {
  const { addItem } = useShoppingCart();
  const { toast } = useToast();

  const event = {
    id: id,
    currency: currency,
    name: name,
    description: description,
    quantity: quantity,
    image: image,
    price: seat.price,
    seat: seat.seat,
  };

  return (
    <button
      className="flex items-center bg-green-500/10 gap-2 h-full rounded-full"
      onClick={() => {
        addItem(event);
        toast({
          title: `${name} Foi adicionado ao carrinho`,
        });
      }}
    >
      <div className="flex flex-row items-center">
        <FaCartPlus className="text-3xl ml-3" />
        <div className="">Adicionar ao Carrinho</div>
      </div>
    </button>
  );
};

export default AddToCartButton;
