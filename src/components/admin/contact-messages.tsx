
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Check, Trash2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageDetailOpen, setMessageDetailOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Impossible de charger les messages");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectMessage = (messageId) => {
    setSelectedMessages((current) => {
      if (current.includes(messageId)) {
        return current.filter((id) => id !== messageId);
      } else {
        return [...current, messageId];
      }
    });
  };

  const selectAllMessages = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map((message) => message.id));
    }
  };

  const markAsRead = async (messageId = null) => {
    const ids = messageId ? [messageId] : selectedMessages;
    if (ids.length === 0) return;

    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .in("id", ids);

      if (error) throw error;

      setMessages((current) =>
        current.map((message) =>
          ids.includes(message.id) ? { ...message, read: true } : message
        )
      );

      toast.success(
        `${ids.length} message${
          ids.length > 1 ? "s" : ""
        } marqué${ids.length > 1 ? "s" : ""} comme lu${ids.length > 1 ? "s" : ""}`
      );

      setSelectedMessages([]);
    } catch (error) {
      console.error("Error marking messages as read:", error);
      toast.error("Erreur lors du marquage des messages");
    }
  };

  const confirmDelete = (message = null) => {
    if (message) {
      setMessageToDelete(message);
    } else if (selectedMessages.length > 0) {
      setMessageToDelete({ id: selectedMessages, multiple: true });
    } else {
      return;
    }
    setDeleteDialogOpen(true);
  };

  const deleteMessage = async () => {
    try {
      if (!messageToDelete) return;

      const ids = messageToDelete.multiple
        ? messageToDelete.id
        : [messageToDelete.id];

      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .in("id", ids);

      if (error) throw error;

      setMessages((current) =>
        current.filter((message) => !ids.includes(message.id))
      );

      toast.success(
        `${ids.length} message${
          ids.length > 1 ? "s" : ""
        } supprimé${ids.length > 1 ? "s" : ""}`
      );

      setSelectedMessages((current) =>
        current.filter((id) => !ids.includes(id))
      );
    } catch (error) {
      console.error("Error deleting messages:", error);
      toast.error("Erreur lors de la suppression des messages");
    } finally {
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const viewMessageDetail = (message) => {
    setSelectedMessage(message);
    markAsRead(message.id);
    setMessageDetailOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-morocco-blue animate-spin" />
        <span className="ml-2 text-morocco-blue">Chargement des messages...</span>
      </div>
    );
  }

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
          Messages de contact
        </motion.h2>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMessages}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Actualiser
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAsRead()}
            disabled={selectedMessages.length === 0}
            className="flex items-center"
          >
            <Check className="h-4 w-4 mr-1" /> Marquer comme lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => confirmDelete()}
            disabled={selectedMessages.length === 0}
            className="flex items-center text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Supprimer
          </Button>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-gray-100 p-4">
                <Mail className="h-8 w-8 text-morocco-blue" />
              </div>
              <h3 className="text-lg font-medium">Aucun message</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Vous n'avez pas encore reçu de messages de contact.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Messages ({messages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedMessages.length === messages.length &&
                          messages.length > 0
                        }
                        onCheckedChange={selectAllMessages}
                      />
                    </TableHead>
                    <TableHead className="w-16"></TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.tr
                        key={message.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`${
                          message.read ? "" : "bg-morocco-blue/5"
                        } cursor-pointer hover:bg-gray-50`}
                        onClick={() => viewMessageDetail(message)}
                      >
                        <TableCell
                          className="py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selectedMessages.includes(message.id)}
                            onCheckedChange={() =>
                              toggleSelectMessage(message.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          {!message.read && (
                            <div className="w-3 h-3 bg-morocco-blue rounded-full"></div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium py-3">
                          {message.name}
                          <div className="text-sm text-gray-500">
                            {message.email}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          {message.subject || (
                            <span className="text-gray-500">
                              [Aucun sujet]
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-3">
                          {formatDate(message.date)}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(message.id);
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete(message);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Dialog */}
      <AlertDialog
        open={messageDetailOpen}
        onOpenChange={setMessageDetailOpen}
      >
        <AlertDialogContent className="max-w-2xl">
          {selectedMessage && (
            <div>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {selectedMessage.subject || "[Aucun sujet]"}
                </AlertDialogTitle>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    De: {selectedMessage.name} ({selectedMessage.email})
                  </span>
                  <span>{formatDate(selectedMessage.date)}</span>
                </div>
              </AlertDialogHeader>

              <div className="my-4 p-4 border rounded-md bg-gray-50">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <AlertDialogFooter className="flex sm:justify-between">
                <div className="hidden sm:block">
                  <Button
                    variant="outline"
                    onClick={() => {
                      confirmDelete(selectedMessage);
                      setMessageDetailOpen(false);
                    }}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
                <AlertDialogCancel>Fermer</AlertDialogCancel>
              </AlertDialogFooter>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              {messageToDelete?.multiple
                ? `${messageToDelete.id.length} messages seront supprimés définitivement.`
                : "Ce message sera supprimé définitivement."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteMessage}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
