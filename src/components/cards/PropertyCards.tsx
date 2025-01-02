import { useNavigate } from "react-router-dom";

import { Edit, Eye, Trash2 } from "lucide-react";

import useRentModal from "@/hooks/rentModal";
import useDeleteModal from "@/hooks/deleteModal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { TPropertyListing } from "@/types/commonTypes";
import { Badge } from "../ui/badge";

interface PropertyCardProps {
  data: TPropertyListing;
  myProperty?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ data, myProperty }) => {
  const navigate = useNavigate();
  const rentModal = useRentModal();
  const deleteModal = useDeleteModal();

  const handleNavigation = () => {
    if (myProperty) return;
    navigate(`/property/detail?id=${data._id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteModal.onOpen(data._id, "property");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    rentModal.onOpenEdit(data);
  };

  return (
    <Card
      className="w-full max-w-[358px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
      onClick={handleNavigation}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={data.images[0]}
            className="w-full h-48 object-cover"
            loading="lazy"
            alt={data.title}
          />
          {myProperty && (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button size="icon" variant="secondary" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/property/detail?id=${data._id}`);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2 line-clamp-1">
          {data.title}
        </CardTitle>
        <Badge variant="secondary" className="mb-2">
          Private Room
        </Badge>
        <p className="text-2xl font-bold text-primary">PKR{data.rent}/month</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t">
        <div className="flex items-center gap-2">
          <img src="/images/Bed.svg" alt="Bed" className="w-5 h-5" />
          <span>{data.bed}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/Shower.svg" alt="Shower" className="w-5 h-5" />
          <span>{data.shower}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/Size.svg" alt="Size" className="w-5 h-5" />
          <span>{data.shower}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
