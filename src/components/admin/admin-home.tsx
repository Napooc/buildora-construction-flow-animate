
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminHome() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Bienvenue</CardTitle>
          <CardDescription>Panneau d'administration Buildora</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Utilisez ce tableau de bord pour gérer les messages de contact et surveiller l'activité du site.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Guide rapide</CardTitle>
          <CardDescription>Comment utiliser ce tableau de bord</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Consultez les messages de contact dans l'onglet dédié</li>
            <li>Gérez les contenus du site</li>
            <li>Surveillez les performances</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Support</CardTitle>
          <CardDescription>Besoin d'aide?</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Si vous rencontrez des difficultés avec le tableau de bord, contactez l'équipe technique.</p>
        </CardContent>
      </Card>
    </div>
  );
}
