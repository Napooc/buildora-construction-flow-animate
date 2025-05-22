
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { UserCheck, Search, Plus, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Karim El Mansouri",
    role: "Architecte senior",
    department: "Design",
    email: "karim@buildora.ma",
    phone: "+212 661-234-567",
    avatar: null,
  },
  {
    id: 2,
    name: "Leila Benali",
    role: "Ingénieure en structure",
    department: "Ingénierie",
    email: "leila@buildora.ma",
    phone: "+212 662-345-678",
    avatar: null,
  },
  {
    id: 3,
    name: "Omar Kadiri",
    role: "Chef de projet",
    department: "Gestion de projet",
    email: "omar@buildora.ma",
    phone: "+212 663-456-789",
    avatar: null,
  },
  {
    id: 4,
    name: "Yasmine Tazi",
    role: "Responsable financier",
    department: "Finance",
    email: "yasmine@buildora.ma",
    phone: "+212 664-567-890",
    avatar: null,
  },
  {
    id: 5,
    name: "Ahmed Berrada",
    role: "Ingénieur site",
    department: "Construction",
    email: "ahmed@buildora.ma",
    phone: "+212 665-678-901",
    avatar: null,
  },
  {
    id: 6,
    name: "Fatima Zohra",
    role: "Directrice commerciale",
    department: "Commercial",
    email: "fatima@buildora.ma",
    phone: "+212 666-789-012",
    avatar: null,
  },
  {
    id: 7,
    name: "Samir El Alaoui",
    role: "Chef d'équipe",
    department: "Construction",
    email: "samir@buildora.ma",
    phone: "+212 667-890-123",
    avatar: null,
  },
  {
    id: 8,
    name: "Nadia Benkiran",
    role: "Spécialiste achats",
    department: "Approvisionnement",
    email: "nadia@buildora.ma",
    phone: "+212 668-901-234",
    avatar: null,
  },
];

export function TeamDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(TEAM_MEMBERS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilteredMembers(
      TEAM_MEMBERS.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMember = () => {
    toast.info("Fonctionnalité à venir : Ajout de nouveaux membres");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Design":
        return "bg-indigo-500";
      case "Ingénierie":
        return "bg-blue-500";
      case "Gestion de projet":
        return "bg-morocco-blue";
      case "Finance":
        return "bg-green-500";
      case "Construction":
        return "bg-morocco-terracotta";
      case "Commercial":
        return "bg-purple-500";
      case "Approvisionnement":
        return "bg-morocco-gold";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold text-morocco-deep-blue"
        >
          Annuaire des employés
        </motion.h2>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-64"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-morocco-blue hover:bg-morocco-deep-blue"
            onClick={handleAddMember}
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-morocco-blue animate-spin" />
          <span className="ml-2 text-morocco-blue">Chargement de l'équipe...</span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-gray-100 p-4">
                <Users className="h-8 w-8 text-morocco-blue" />
              </div>
              <h3 className="text-lg font-medium">Aucun résultat</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Aucun membre ne correspond à votre recherche "{searchTerm}".
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative"
            >
              <Card className="hover:shadow-md transition-all h-full">
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback className="bg-morocco-blue text-white text-lg">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h3 className="font-semibold text-lg text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 mb-2 text-center">{member.role}</p>
                  <Badge
                    className={`${getDepartmentColor(
                      member.department
                    )} text-white mb-4`}
                  >
                    {member.department}
                  </Badge>
                  <div className="w-full space-y-2 mt-2">
                    <p className="text-sm flex">
                      <span className="text-gray-500 w-20">Email:</span>
                      <span className="font-medium truncate">
                        {member.email}
                      </span>
                    </p>
                    <p className="text-sm flex">
                      <span className="text-gray-500 w-20">Téléphone:</span>
                      <span className="font-medium">{member.phone}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        toast.info(`Profil de ${member.name} à venir`)
                      }
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Voir le profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
