import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, ArrowRight, Fish } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. She was named Felicette.",
  "Cats can jump up to six times their length.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
  "Cats have a third eyelid called the 'haw' to protect their eyes.",
  "A cat's sense of smell is 14 times stronger than a human's.",
];

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive coloring and vocal nature" },
  { name: "Persian", description: "Recognized for their long, luxurious coat and flat face" },
  { name: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly personality" },
  { name: "Bengal", description: "Wild-looking cats with a spotted or marbled coat" },
  { name: "British Shorthair", description: "Round-faced cats with a plush, dense coat" },
];

const Index = () => {
  const { toast } = useToast();
  const [likeCount, setLikeCount] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [catHappiness, setCatHappiness] = useState(50);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setCatHappiness((prev) => Math.min(prev + 10, 100));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    toast({
      title: "Meow-velous!",
      description: "Your love for cats is paw-sitively appreciated!",
      duration: 3000,
    });
  };

  const feedCat = () => {
    setCatHappiness((prev) => Math.min(prev + 5, 100));
    toast({
      title: "Yum!",
      description: "The cat enjoyed the treat!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.header 
        ref={headerRef}
        className="bg-purple-600 text-white py-20 px-8 relative overflow-hidden"
        style={{ opacity: headerOpacity, scale: headerScale }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Purrfect World of Cats
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Embark on a whisker-twitching journey through the fascinating realm of our feline companions
          </motion.p>
        </div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, repeatType: "reverse" }}
            >
              <Paw className="text-white opacity-50" />
            </motion.div>
          ))}
        </motion.div>
      </header>
      
      <main className="max-w-6xl mx-auto py-16 px-8">
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
            className="mx-auto object-cover w-full h-[600px] rounded-lg shadow-2xl"
          />
          <motion.div 
            className="absolute bottom-8 left-8 right-8 bg-black bg-opacity-70 text-white p-6 rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-semibold"
              >
                {catFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      
        <motion.div 
          className="bg-white rounded-lg p-6 shadow-lg mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-purple-700">Cat Happiness Meter</h3>
          <Progress value={catHappiness} className="h-4 mb-2" />
          <p className="text-lg">{catHappiness}% Happy</p>
          <div className="flex justify-center mt-4">
            <Button onClick={feedCat} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Fish className="mr-2 h-5 w-5" /> Feed the Cat
            </Button>
          </div>
        </motion.div>
      
        <Tabs defaultValue="characteristics" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="characteristics" className="text-lg py-3">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds" className="text-lg py-3">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card className="border-4 border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-purple-700">
                  <Info className="mr-3 h-8 w-8" />
                  Characteristics of Cats
                </CardTitle>
                <CardDescription className="text-lg">What makes cats truly unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-4">
                  {[
                    "Independent nature with a touch of affection",
                    "Excellent hunters with razor-sharp claws and teeth",
                    "Incredibly flexible bodies and lightning-quick reflexes",
                    "Keen senses, especially their extraordinary hearing and night vision",
                    "Masters of communication through vocalizations, body language, and scent marking"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center text-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="mr-3 h-6 w-6 text-purple-500" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card className="border-4 border-pink-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-pink-700">
                  <Cat className="mr-3 h-8 w-8" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription className="text-lg">Discover some of the most beloved cat breeds worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {catBreeds.map((breed, index) => (
                      <CarouselItem key={index}>
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Badge className="mb-4 text-lg px-3 py-1">{breed.name}</Badge>
                              <p className="text-center">{breed.description}</p>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center relative mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLike}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none text-lg px-8 py-6"
            >
              <Heart className="mr-3 h-6 w-6 text-white group-hover:text-red-200 transition-colors" />
              Show Your Cat Love ({likeCount})
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Want to Learn More?</h2>
          <p className="text-xl mb-6">Dive deeper into the world of cats and discover more fascinating facts!</p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-3">
            Explore More <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </main>

      <footer className="bg-purple-800 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Connected with the Feline World</h3>
          <p className="mb-6">Sign up for our newsletter to receive weekly cat facts and adorable photos!</p>
          <div className="flex justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-l-lg focus:outline-none text-purple-800"
            />
            <Button className="bg-pink-500 hover:bg-pink-600 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
